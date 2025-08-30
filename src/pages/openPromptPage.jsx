import React, {useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { sendPrompt } from "../api/openPromptApi";
import hljs from "highlight.js"
const OpenPromptPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const result = await sendPrompt(prompt);
      setResponse(result.response || "No response received.");
    } catch (err) {
      setResponse("Error: Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };
   useEffect(() => {
    if (!response || !responseRef.current) return;

    const codeBlocks = responseRef.current.querySelectorAll("pre");

    codeBlocks.forEach((block) => {
      // Skip if already processed
      if (block.parentElement.classList.contains("code-wrapper")) return;

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-wrapper position-relative";
      wrapper.style.marginBottom = "1rem";

      // Clone code block
      const codeClone = block.cloneNode(true);
      hljs.highlightElement(codeClone.querySelector("code") || codeClone); // Apply syntax highlight

      // Create copy button
      const button = document.createElement("button");
      button.innerText = "📋 Copy";
      button.className = "copy-btn btn btn-sm btn-secondary";
      button.style.position = "absolute";
      button.style.top = "8px";
      button.style.right = "8px";
      button.style.zIndex = "10";

      button.onclick = () => {
        const code = block.innerText;
        navigator.clipboard.writeText(code).then(() => {
          button.innerText = "✅ Copied!";
          setTimeout(() => (button.innerText = "📋 Copy"), 2000);
        });
      };

      wrapper.appendChild(button);
      wrapper.appendChild(codeClone);

      block.replaceWith(wrapper);
    });
  }, [response]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow rounded-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Open AI Prompt Playground</h5>
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
                    <div 
                      dangerouslySetInnerHTML={{ __html: response }}
                      style={{ whiteSpace: "pre-wrap" }}>
                    </div>
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

export default OpenPromptPage;
