from app.models.request import CodeReviewRequest
from app.models.response import CodeReviewResponse
from app.services.retrieval import get_question_by_name
from app.utils.prompt_builder import build_prompt
from app.services.llm_service import analyze_code
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

async def process_code_review(request: CodeReviewRequest) -> CodeReviewResponse:
    logger.info(f"Processing code review for question_name: {request.question_name}, student_id: {request.student_id}")
    
    # 1. Fetch question (returns None if not found in db)
    question_data = get_question_by_name(request.question_name)
    
    if question_data:
        problem = question_data.get("problem_statement", request.question_name)
        approaches = question_data.get("correct_approaches", [])
    else:
        # Fallback if the question isn't in our DB
        logger.info(f"Question '{request.question_name}' not found in DB. Falling back to LLM inference.")
        problem = f"The student is trying to solve a problem titled '{request.question_name}'. Deduce the specific goal dynamically from their code."
        approaches = []
    
    # 2. Build explicit prompt
    prompt = build_prompt(
        problem=problem,
        correct_approaches=approaches,
        student_code=request.student_solution, 
        student_solution=None,
        student_id=request.student_id
    )
    
    # 3. Analyze code using LLM natively
    logger.info("Sending code to LLM for review.")
    response = await analyze_code(prompt)
    
    # Fallback assignment to ensure student_id is always carried over
    if not response.student_id:
        response.student_id = request.student_id
        
    return response
