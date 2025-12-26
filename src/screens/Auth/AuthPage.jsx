import { useEffect, useState } from "react";
import { Card, Form, Input, Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import PrimaryButton from "../../components/common/PrimaryButton";
import useAuth from "../../hook/useAuth";

export default function AuthPage() {
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [submitting, setSubmitting] = useState(false);

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const onLogin = async (values) => {
    try {
      setSubmitting(true);
      const res = await login(values.email, values.password);
      if (!res?.success) return message.error(res?.message || "Login failed");
      message.success("Login successful!");
      navigate("/", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  const onRegister = async (values) => {
    try {
      setSubmitting(true);
      const res = await register(
        values.fullName,
        values.email,
        values.password
      );
      if (!res?.success)
        return message.error(res?.message || "Register failed");
      message.success("Register successful! Please login.");
      setTab("login");
      loginForm.setFieldsValue({ email: values.email });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-black py-8">
        <PageContainer>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Login / Register
          </h1>
          <p className="text-white/70 text-sm mt-2">
            Use your account to enroll courses.
          </p>
        </PageContainer>
      </div>

      <PageContainer className="py-10">
        <div className="max-w-xl mx-auto">
          <Card className="rounded-2xl shadow-sm" bodyStyle={{ padding: 24 }}>
            <Tabs
              activeKey={tab}
              onChange={setTab}
              items={[
                {
                  key: "login",
                  label: "Login",
                  children: (
                    <Form form={loginForm} layout="vertical" onFinish={onLogin}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please enter email" },
                          { type: "email", message: "Invalid email" },
                        ]}
                      >
                        <Input placeholder="you@example.com" />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "Please enter password" },
                        ]}
                      >
                        <Input.Password placeholder="••••••••" />
                      </Form.Item>

                      <PrimaryButton
                        htmlType="submit"
                        className="w-full h-11 text-base"
                        disabled={loading || submitting}
                      >
                        {submitting ? "Logging in..." : "Login"}
                      </PrimaryButton>
                    </Form>
                  ),
                },
                {
                  key: "register",
                  label: "Register",
                  children: (
                    <Form
                      form={registerForm}
                      layout="vertical"
                      onFinish={onRegister}
                    >
                      <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[
                          { required: true, message: "Please enter full name" },
                        ]}
                      >
                        <Input placeholder="Nguyen Van A" />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please enter email" },
                          { type: "email", message: "Invalid email" },
                        ]}
                      >
                        <Input placeholder="you@example.com" />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "Please enter password" },
                          { min: 6, message: "At least 6 characters" },
                        ]}
                      >
                        <Input.Password placeholder="••••••••" />
                      </Form.Item>

                      <PrimaryButton
                        htmlType="submit"
                        className="w-full h-11 text-base"
                        disabled={loading || submitting}
                      >
                        {submitting ? "Creating..." : "Create account"}
                      </PrimaryButton>
                    </Form>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}
