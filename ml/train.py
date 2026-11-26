from pathlib import Path
import json

import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split


# 把输出存到训练脚本旁边的 ml/artifacts 文件夹
artifacts = Path(__file__).resolve().parent / "artifacts"
artifacts.mkdir(exist_ok=True)

# 生成模拟订单。固定随机种子，方便重复实验
rng = np.random.default_rng(42)
n = 2000
amount = rng.uniform(100, 10000, n)
volatility = rng.uniform(0, 1, n)
frequency = rng.integers(1, 50, n)
X = np.column_stack([amount, volatility, frequency])

# 每满足一个条件就加 1 分，达到 2 分就标为高风险
score = (
    (amount > 7000).astype(int)
    + (volatility > 0.65).astype(int)
    + (frequency > 35).astype(int)
)
y = (score >= 2).astype(int)

# 留出 25% 的订单用于测试，并保持两组的高风险订单比例接近
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

model = RandomForestClassifier(
    n_estimators=150,
    max_depth=8,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1,
)
model.fit(X_train, y_train)
accuracy = float(accuracy_score(y_test, model.predict(X_test)))

# 保存模型和评估结果。下一步的自动化测试会读取这两个文件
joblib.dump(model, artifacts / "risk_model.joblib")
metrics = {
    "dataset": "synthetic",
    "accuracy": accuracy,
    "training_samples": len(X_train),
    "testing_samples": len(X_test),
    "model": "RandomForestClassifier",
    "random_state": 42,
}
(artifacts / "metrics.json").write_text(
    json.dumps(metrics, indent=2), encoding="utf-8"
)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")
print(f"Model accuracy: {accuracy:.2%}")
print(f"Model saved to: {artifacts}")