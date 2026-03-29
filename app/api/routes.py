from fastapi import APIRouter
from app.models.request import CodeReviewRequest
from app.models.response import CodeReviewResponse
from app.services.review_service import process_code_review

router = APIRouter()

@router.post("/review-code", response_model=CodeReviewResponse)
async def review_code_endpoint(request: CodeReviewRequest):
    return await process_code_review(request)
