import LoginForm from '@/app/components/ui/LoginForm';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
    const message = "Don't have an account?"
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <Image className='block mx-auto h-12 w-auto' loading="eager" src="/logo.svg" alt="Logo" width={100} height={50} />
                    <h2 className="mt-6 text-3xl font-extrabold text-brand">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">Please sign in to continue your project</p>
                </div>

                <LoginForm />
                <div className="pt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {message}{" "}
                        <Link href="/register" className="font-bold text-brand hover:underline underline-offset-4">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;