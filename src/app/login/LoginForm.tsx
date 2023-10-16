'use client';
import { SignIn } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';
import { useEffect } from 'react';


export default function LoginForm() {
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN') {
                    window.location.href = "/admin/course-management";
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <SignIn
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            showLinks={false}
            providers={[]} />
    );
}
