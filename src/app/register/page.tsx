
import { DonorRegistrationForm } from "@/components/donor-registration-form";
import { Navbar } from "@/components/navbar";

export default function DonorRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Donor Registration</h1>
            <p className="text-gray-600 mt-2">
              Please fill out the form below to become a registered blood donor. Your information will be kept confidential.
            </p>
          </div>
          <DonorRegistrationForm />
        </div>
      </div>
    </div>
  );
}
