import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp 
        afterSignOutUrl="/" 
        appearance={{
          elements: {
            card: {
              backgroundColor: "#FFFFFF2B", // Set background color
              boxShadow: "none", // Ensure no shadow is applied
              WebkitBoxShadow: "none", // Ensure no shadow on WebKit browsers
              MozBoxShadow: "none", // Ensure no shadow on Mozilla browsers
            },
            formButtonPrimary: {
              backgroundColor: "#5044F1", // Primary button color
              color: "#FFFFFF", // Text color for primary button
              hover: {
                backgroundColor: "#6F5DF5", // Button color on hover
              },
            },
            formFieldInput: {
              backgroundColor: "#FFFFFF", // Background color for input fields
              borderColor: "#802EE8", // Border color for input fields
              color: "#5044F1", // Text color for input fields
            },

            headerTitle: {
              color: "#FFFFFF", // Set header title color to white
              fontFamily: "Nunito Sans, sans-serif", // Set font family to Nunito Sans
              fontSize: "24px", // Adjust font size as needed
              fontWeight: "700", // Set font weight to bold (700)
            },
            headerSubtitle: {
              color: "#FFFFFF",
            },
            socialButtonsBlockButton: {
              color: "#FFFFFF"
            },
            socialButtonsBlockButtonText: {
              color:"#FFFFFF"
            },
            formFieldLabel: {
              color:"#FFFFFF"
            },
            footer: {
              colour: "#5044F1"
            }

          }
        }}
      />
    </div>
  );
}
