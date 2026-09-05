import cv2
import numpy as np


def analyze_image(image_bytes):

    # Convert uploaded bytes into a NumPy array
    image_array = np.frombuffer(
        image_bytes,
        np.uint8
    )

    # Decode image
    image = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR
    )

    # If image cannot be read
    if image is None:
        return {
            "success": False,
            "visual_score": 0,
            "message": "Could not read the image."
        }


    # Resize for faster analysis
    image = cv2.resize(
        image,
        (120, 120)
    )


    # Convert BGR → RGB
    image_rgb = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )


    # Average brightness
    brightness = np.mean(image_rgb)


    # Extract colour channels
    r = image_rgb[:, :, 0].astype(float)
    g = image_rgb[:, :, 1].astype(float)
    b = image_rgb[:, :, 2].astype(float)


    # Estimate how brown/tea-like the image is
    brown_mask = (
        (r > g) &
        (g > b) &
        ((r - b) > 20)
    )


    brown_ratio = np.mean(brown_mask)


    # Start with a neutral score
    score = 50


    # Reasonable chai brightness
    if 70 < brightness < 210:
        score += 15


    # Tea-like brown colour
    score += min(
        25,
        brown_ratio * 100
    )


    # Keep score between 0 and 100
    score = max(
        0,
        min(
            100,
            round(score)
        )
    )


    return {
        "success": True,
        "visual_score": score,
        "brightness": round(float(brightness), 2),
        "brown_ratio": round(float(brown_ratio), 3),
        "message": "Image successfully analyzed by OpenCV."
    }
import numpy as np


def analyze_image(image_bytes):

    # Convert uploaded bytes into a NumPy array
    image_array = np.frombuffer(
        image_bytes,
        np.uint8
    )

    # Decode image
    image = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR
    )

    # If image cannot be read
    if image is None:
        return {
            "success": False,
            "visual_score": 0,
            "message": "Could not read the image."
        }


    # Resize for faster analysis
    image = cv2.resize(
        image,
        (120, 120)
    )


    # Convert BGR → RGB
    image_rgb = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )


    # Average brightness
    brightness = np.mean(image_rgb)


    # Extract colour channels
    r = image_rgb[:, :, 0].astype(float)
    g = image_rgb[:, :, 1].astype(float)
    b = image_rgb[:, :, 2].astype(float)


    # Estimate how brown/tea-like the image is
    brown_mask = (
        (r > g) &
        (g > b) &
        ((r - b) > 20)
    )


    brown_ratio = np.mean(brown_mask)


    # Start with a neutral score
    score = 50


    # Reasonable chai brightness
    if 70 < brightness < 210:
        score += 15


    # Tea-like brown colour
    score += min(
        25,
        brown_ratio * 100
    )


    # Keep score between 0 and 100
    score = max(
        0,
        min(
            100,
            round(score)
        )
    )


    return {
        "success": True,
        "visual_score": score,
        "brightness": round(float(brightness), 2),
        "brown_ratio": round(float(brown_ratio), 3),
        "message": "Image successfully analyzed by OpenCV."
    }