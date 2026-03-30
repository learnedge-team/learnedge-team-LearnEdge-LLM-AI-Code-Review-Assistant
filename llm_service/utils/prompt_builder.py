def build_prompt(problem: str, correct_approaches: list, student_code: str, student_solution: str = None, student_id: str = "") -> str:
    approaches_section = ""
    if correct_approaches:
        approaches_str = chr(10).join(correct_approaches)
        approaches_section = f"{approaches_str}"

    prompt = f"""
You are an expert coding reviewer.

STRICT RULES:
- Only analyze the given problem.
- Do NOT assume incorrect behavior.
- Carefully verify logic before stating issues.
- ALWAYS provide fixed_code.
- BE ACCURATE IN YOUR RESPONSE
- DON'T HALLUCINATE IN ANY CASE

Problem:
{problem}

Correct Approaches:
{approaches_section}

Student Code:
{student_code}

Tasks:
1. Identify REAL bugs (no assumptions)
2. Check edge cases (i == j, duplicates, etc.)
3. Analyze time complexity
4. Provide corrected code (mandatory)
5. Explain clearly

Return JSON:
{{
  "student_id": "{student_id}",
  "status": "success or needs_work",
  "issues": ["list", "of", "issues"],
  "fixed_code": "the complete fixed student code",
  "explanation": "clear explanation with time and space complexity",
  "hint": "helpful hint",
  "error": " find the error in student code",
  "suggestion": " give 1 or 2 suggestion to improve the code"
  
}}
"""
    return prompt.strip()
