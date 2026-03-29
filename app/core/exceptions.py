from fastapi import HTTPException

class QuestionNotFoundError(HTTPException):
    def __init__(self, question_name: str):
        super().__init__(status_code=404, detail=f"Question with name '{question_name}' not found.")

class LLMServiceError(HTTPException):
    def __init__(self, detail: str = "LLM Service failed"):
        super().__init__(status_code=500, detail=detail)
