import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../lib/auth';
import Logo from '../public/workflow-mark-indigo-600.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignIn() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const isValidPassword = (password) => {
    const re =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
    return re.test(String(password));
  };
  const isValidConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  const isReadyToSubmit =
    isValidEmail(email) &&
    isValidPassword(password) &&
    isValidConfirmPassword(password, confirmPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signupWithEmail(email, password);
    router.push('sign-in');
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-full relative" style={{ height: '5vh' }}>
          <Image layout="fill" src={Logo} alt="Logo" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          注册新账号
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          已有账号？
          <Link href="/sign-in">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {' '}
              登录{' '}
            </a>
          </Link>
        </p>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {' '}
                邮箱{' '}
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {!isValidEmail(email) && email && (
                <p className="mt-2 text-xs text-red-500">
                  请输入有效的邮箱地址
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {' '}
                密码{' '}
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {!isValidPassword(password) && password && (
                <p className="mt-2 text-xs text-red-500">
                  密码要求至少8位，包含大小写字母，数字和特殊符号
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {' '}
                确认密码{' '}
              </label>
              <div className="mt-1">
                <input
                  value={confirmPassword}
                  onInput={(e) => setConfirmPassword(e.target.value)}
                  id="confirmm-assword"
                  name="confirmm-assword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {!isValidConfirmPassword(password, confirmPassword) &&
                confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    两次输入的密码不一致
                  </p>
                )}
            </div>
            <div>
              <button
                disabled={!isReadyToSubmit}
                style={!isReadyToSubmit ? { cursor: 'not-allowed' } : {}}
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                注册
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
