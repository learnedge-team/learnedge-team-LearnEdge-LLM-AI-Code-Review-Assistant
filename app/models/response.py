from pydantic import BaseModel, Field
from typing import List, Optional, Any

class CodeReviewResponse(BaseModel):
    student_id: str = Field(default="")
    status: str = Field(default="needs_work")
    issues: List[Any] = Field(default_factory=list)
    fixed_code: str = Field(default="")
    explanation: Any = Field(default="")
    hint: Any = Field(default="")
    
    # Making these Any to safely parse if the LLM returns a List instead of a String
    error: Any = Field(default="")
    suggestion: Any = Field(default="")
