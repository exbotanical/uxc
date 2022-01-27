export const isLocalRuntime = process.env.NODE_ENV !== 'production';

export const isInsecureMode = !!process.env.INSECURE_MODE;
