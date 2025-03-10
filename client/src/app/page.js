


import { LoginForm } from '@/components/ui/login-form';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';

export default function Home() {
  return (
    <Card className="min-h-screen flex items-center justify-center p-6">
      <CardContent className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section (Hidden on small screens) */}
        <div className="hidden md:flex justify-center items-center min-h-[400px]">
          <Image
            src="/image.png"
            alt="Welcome Image"
            width={500}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Login Form Section */}
        <div className="flex justify-center items-center w-full">
          <LoginForm className="w-full max-w-md" />
        </div>
      </CardContent>
    </Card>
  );
}
