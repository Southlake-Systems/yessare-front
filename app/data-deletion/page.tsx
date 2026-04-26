export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Data Deletion Policy
        </h1>

        <p className="text-gray-600 mb-4">
          At <span className="font-semibold">Your Company Name</span>, we respect your privacy and give you full control over your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Requesting Data Deletion
        </h2>
        <p className="text-gray-600 mb-4">
          You can request deletion of your personal data at any time by following the steps below:
        </p>

        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Email us at <span className="font-medium">support@yourdomain.com</span></li>
          <li>Include your registered email or account ID</li>
          <li>Write "Data Deletion Request" in the subject line</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          What Happens Next
        </h2>
        <p className="text-gray-600 mb-4">
          Once we receive your request:
        </p>

        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Your identity will be verified</li>
          <li>Your data will be permanently deleted within 7 working days</li>
          <li>You will receive a confirmation email</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Data We Delete
        </h2>
        <p className="text-gray-600 mb-4">
          This includes:
        </p>

        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Account information</li>
          <li>Order history</li>
          <li>Saved preferences</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Exceptions
        </h2>
        <p className="text-gray-600 mb-4">
          Certain data may be retained if required for:
        </p>

        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Legal obligations</li>
          <li>Fraud prevention</li>
          <li>Security purposes</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Contact Us
        </h2>
        <p className="text-gray-600">
          If you have any questions, contact us at{" "}
          <span className="font-medium">support@yourdomain.com</span>
        </p>

      </div>
    </div>
  );
}