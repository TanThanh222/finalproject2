import PageContainer from "../../components/layout/PageContainer.jsx";

export default function LoginRegisterScreen() {
  return (
    <section className="bg-white py-12">
      <PageContainer>
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Login / Register</h1>
          <p className="text-gray-600 mb-8">
            Ở đây bạn sẽ dựng hai form Login / Register giống Figma.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold mb-2">Login</h2>
              <p className="text-sm text-gray-500">
                Form đăng nhập sẽ nằm ở đây.
              </p>
            </div>
            <div className="border rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold mb-2">Register</h2>
              <p className="text-sm text-gray-500">
                Form đăng ký sẽ nằm ở đây.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
