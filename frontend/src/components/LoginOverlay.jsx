import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import { useState } from "react";

export function LoginSignupOverlay({ onLogin, onSignup }) {
    const [ isOnSignup, setIsOnSignup ] = useState(false);

    return (
        <>
            {isOnSignup ? 
            <SignUpOverlay onSignUp={onSignup} setIsOnSignup={setIsOnSignup} />
             : <LoginOverlay onLogin={onLogin} setIsOnSignup={setIsOnSignup} />}
        </>
    )
}

function SignUpOverlay({ onSignUp, setIsOnSignup }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        // Simulate login API call
        await new Promise((res) => setTimeout(res, 1000));
        onSignUp(data.email); // Notify parent of successful login
    };

    return (<Box
        sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
        }}
    >
        <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 6, borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Signup
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        variant="outlined"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />

                    <Stack spacing={2} mt={3}>
                        {/* Login button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing up..." : "Sign up"}
                        </Button>

                        {/* Signup button */}
                        <Button
                            type="button"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => setIsOnSignup(false)}
                        >
                            Already have an account?
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    </Box>
    );
}

function LoginOverlay({ onLogin, setIsOnSignup }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        // Simulate login API call
        await new Promise((res) => setTimeout(res, 1000));
        onLogin(data.email); // Notify parent of successful login
    };

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 6, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h2" align="center" gutterBottom>
                        Login
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            variant="outlined"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ""}
                        />

                        {/* Password */}
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ""}
                        />

                        <Stack spacing={2} mt={3}>
                            {/* Login button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>

                            {/* Signup button */}
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={() => setIsOnSignup(true)}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}