from pydantic import BaseModel, Field, AliasChoices, ConfigDict

class CodeReviewRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    question_name: str = Field(
        default="Unknown Problem", 
        validation_alias=AliasChoices("question name", "question_name", "questionName", "name", "id", "question_id", "question")
    )
    student_id: str = Field(
        default="Unknown Student", 
        validation_alias=AliasChoices("student id", "student_id", "studentId", "user_id", "user")
    )
    student_solution: str = Field(
        default="No solution provided", 
        validation_alias=AliasChoices("student solution", "student_solution", "studentSolution", "code", "student_code", "solution", "answer")
    )
