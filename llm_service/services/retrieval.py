import json
import os
from typing import Dict, Any, List, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "db", "questions.json")

def load_questions() -> List[Dict[str, Any]]:
    try:
        with open(DB_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def get_question_by_name(question_name: str) -> Optional[Dict[str, Any]]:
    questions = load_questions()
    for q in questions:
        name = str(q.get("question_name", "")).strip().lower()
        if name == question_name.strip().lower():
            return q
    return None
