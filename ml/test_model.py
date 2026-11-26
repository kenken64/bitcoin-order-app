import json
from pathlib import Path

import joblib


def test_model_and_metrics():
    artifacts = Path(__file__).resolve().parent / "artifacts"
    model = joblib.load(artifacts / "risk_model.joblib")
    metrics = json.loads((artifacts / "metrics.json").read_text(encoding="utf-8"))

    assert callable(getattr(model, "predict", None))
    assert metrics["dataset"] == "synthetic"
    assert metrics["training_samples"] == 1500
    assert metrics["testing_samples"] == 500
    assert metrics["accuracy"] >= 0.80