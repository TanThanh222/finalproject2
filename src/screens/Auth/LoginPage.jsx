import { useContext } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PrimaryButton from "../../components/common/PrimaryButton";
import AuthCard from "../../components/common/AuthCard";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;

    const result = await login(email, password);

    if (result.success) {
      message.success("Đăng nhập thành công 🎉");
      navigate("/");
    } else {
      message.error(result.message);
    }
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
                loading={loading}
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
