import json
from groq import AsyncGroq
from app.core.config import settings
from app.core.exceptions import LLMServiceError
from app.utils.logger import setup_logger
from app.models.response import CodeReviewResponse

logger = setup_logger(__name__)

if not settings.GROQ_API_KEY or settings.GROQ_API_KEY == "your_groq_api_key_here":
    logger.warning("GROQ_API_KEY is not set or is using the default template value.")

client = AsyncGroq(api_key=settings.GROQ_API_KEY)

async def analyze_code(prompt: str) -> CodeReviewResponse:
    try:
        response = await client.chat.completions.create(
            model="llama-3.1-8b-instant",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a helpful AI mentor that reviews code. Always respond with valid JSON matching the exact schema requested."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        content = response.choices[0].message.content
        logger.info("Successfully fetched LLM response.")
        
        # Parse JSON
        result = json.loads(content)
        return CodeReviewResponse(**result)
    except Exception as e:
        logger.error(f"LLM Error: {e}")
        raise LLMServiceError(f"Failed to generate review: {str(e)}")
