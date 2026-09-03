def calculate_score(visual_score, taste_score):

    visual_score = max(
        0,
        min(100, visual_score)
    )

    taste_score = max(
        0,
        min(100, taste_score)
    )


    # Taste is slightly more important
    final_score = (
        visual_score * 0.40
        + taste_score * 0.60
    )


    return {
        "visual_score": round(visual_score),
        "taste_score": round(taste_score),
        "overall_score": round(final_score)
    }