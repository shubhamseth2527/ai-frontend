import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { sendPrompt } from "../api/genPromptApi";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const result = await sendPrompt(prompt);
      setResponse(result.response);
    } catch (err) {
      setResponse("Error: Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow rounded-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Google Generative AI Prompt Playground</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="promptInput" className="mb-3">
                  <Form.Label>Enter your prompt</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Ask something like: What is AI?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Send"}
                </Button>
              </Form>

              {response && (
                <div className="mt-4">
                  <h6>AI Response:</h6>
                  <Card className="bg-light p-3">
                    <div>{response}</div>
                  </Card>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PromptPage;
