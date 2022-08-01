import styles from "./styles.module.css";

import { Row, Col } from "antd";

function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={14} className={styles.content}>
          col
        </Col>
      </Row>
    </div>
  );
}

export default App;
