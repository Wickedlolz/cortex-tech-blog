import RegisterForm from "@/components/forms/RegisterForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </section>
  );
}
