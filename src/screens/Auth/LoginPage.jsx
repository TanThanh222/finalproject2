import React from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import PrimaryButton from "../../components/common/PrimaryButton";
import AuthCard from "../../components/common/AuthCard";

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const onFinish = () => {
    onLoginSuccess?.();
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-10">
      <PageContainer>
        <div className="flex justify-center">
          <AuthCard
            title="Welcome back"
            subtitle="Đăng nhập để tiếp tục học với EduPress"
          >
            <Form layout="vertical" onFinish={onFinish} className="mt-4">
              <Form.Item
                label={<span className="font-medium text-gray-700">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-gray-700">Mật khẩu</span>
                }
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  placeholder="••••••••"
                  className="h-11 rounded-xl"
                />
              </Form.Item>

              <PrimaryButton
                htmlType="submit"
                className="w-full h-11 mt-2 text-base"
              >
                Login
              </PrimaryButton>

              <p className="text-center text-sm text-gray-500 mt-4">
                Chưa có tài khoản?{" "}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký ngay
                </span>
              </p>
            </Form>
          </AuthCard>
        </div>
      </PageContainer>
    </div>
  );
}
