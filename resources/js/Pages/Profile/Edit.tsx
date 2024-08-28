import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import { PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AdminLayout head="Profile" tittleHead="Manajemen Profile">
            <div className="py-12">
                <div className="max-w-7xl space-y-6">
                    <div className=" sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
