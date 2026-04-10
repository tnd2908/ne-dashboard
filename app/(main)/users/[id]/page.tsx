
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { User, Mail, Briefcase, Building, Shield, Edit, Trash2 } from 'lucide-react';
import Button from '@/app/components/commons/Button';
import { getUser } from '@/services/user.service';

interface PageProps {
    params: Promise<{ id: string }>;
}

const ROLE_CONFIG: Record<string, string> = {
    admin: 'bg-purple-50 text-purple-700 border-purple-100',
    owner: 'bg-amber-50 text-amber-700 border-amber-100',
    member: 'bg-blue-50 text-blue-700 border-blue-100',
    user: 'bg-gray-50 text-gray-700 border-gray-100'
};

export default async function UserDetailPage({ params }: PageProps) {
    const { id } = await params;
    const user = await getUser(id);

    if (!user) {
        notFound();
    }

    const roleStyle = ROLE_CONFIG[user.role.toLowerCase()] || ROLE_CONFIG.user;

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            User Profile
                        </h1>
                        <p className="text-gray-500 mt-1">
                            View and manage user information
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <div className='flex items-center gap-2 text-nowrap'>
                            <Edit className="w-4 h-4" />
                            Edit User
                        </div>
                    </Button>
                    <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                    >
                        <div className='flex items-center gap-2 text-nowrap'>
                            <Trash2 className="w-4 h-4" />
                            Delete User
                        </div>
                    </Button>
                </div>
            </header>

            {/* User Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <div className="shrink-0">
                        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-100">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    fill
                                    sizes="128px"
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 font-bold">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <div className="flex items-center gap-3 mt-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border capitalize ${roleStyle}`}>
                                    <Shield className="w-3 h-3 mr-1" />
                                    {user.role}
                                </span>
                                <span className="text-gray-500 text-sm">ID: {user.id}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Mail className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Briefcase className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Title</p>
                                    <p className="text-sm font-medium text-gray-900">{user.title}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Building className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Department</p>
                                    <p className="text-sm font-medium text-gray-900">{user.department}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <User className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Status</p>
                                    <p className="text-sm font-medium text-green-600">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">Member Since</span>
                            <span className="text-sm font-medium text-gray-900">Jan 15, 2024</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">Last Active</span>
                            <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">Login Count</span>
                            <span className="text-sm font-medium text-gray-900">247</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-500">Account Status</span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Permissions */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">View Dashboard</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">Manage Projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">View Reports</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <span className="text-sm text-gray-400">Admin Settings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 py-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-700">Updated project documentation</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-700">Completed task: UI Review</p>
                            <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-700">Joined team meeting</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}