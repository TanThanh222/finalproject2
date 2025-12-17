import { useContext } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PrimaryButton from "../../components/common/PrimaryButton";
import AuthCard from "../../components/common/AuthCard";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { fullName, email, password } = values;

    const result = await register(fullName, email, password);

    if (result.success) {
      message.success("Đăng ký thành công 🎉 Vui lòng đăng nhập!");
      navigate("/login");
    } else {
      message.error(result.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-10">
      <PageContainer>
        <div className="flex justify-center">
          <AuthCard
            title="Create account"
            subtitle="Đăng ký để bắt đầu học với EduPress"
          >
            <Form layout="vertical" onFinish={onFinish} className="mt-4">
              <Form.Item
                label={
                  <span className="font-medium text-gray-700">Họ và tên</span>
                }
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input className="h-11 rounded-xl" placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                label={<span className="font-medium text-gray-700">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  className="h-11 rounded-xl"
                  placeholder="you@example.com"
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
                  className="h-11 rounded-xl"
                  placeholder="••••••••"
                />
              </Form.Item>

              <PrimaryButton
                htmlType="submit"
                loading={loading}
                className="w-full h-11 mt-2 text-base"
              >
                Register
              </PrimaryButton>

              <p className="text-center text-sm text-gray-500 mt-4">
                Đã có tài khoản?{" "}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập ngay
                </span>
              </p>
            </Form>
          </AuthCard>
        </div>
      </PageContainer>
    </div>
  );
}
