import Button from "../components/Button";
import Input from "../components/Input";

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-96 rounded-2xl bg-gray-900 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-white">
          AttendX
        </h1>

        <p className="mb-8 text-center text-gray-400">
          Attendance. Analytics. Intelligence.
        </p>

        <div className="space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;