export async function handleSignup(email, password) {
    try {
        const registerResponse = await fetch(`${API_BASE}/api/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!registerResponse.ok) {
      const errorData = await registerResponse.json();
      throw new Error(errorData.error || "Failed to register");
    }
    } catch (err) {

    }
}