import '@lovable.dev/cloud-auth-js';

declare module '@lovable.dev/cloud-auth-js' {
  interface LovableAuth {
    signInWithOAuth(
      provider: 'google' | 'apple' | 'microsoft' | 'lovable',
      opts?: SignInWithOAuthOptions,
    ): Promise<SignInWithOAuthResult>;
  }
}

export {};