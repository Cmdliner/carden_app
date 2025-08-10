export async function refresh(refresh_cookie: any) {
    try {
        const fetchOpts: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
        }
        const res = await fetch("/api/v1/auth/refresh", fetchOpts);
        const data = await res.json();

        if(data.error) return  null;

        // set refresh cookie
    } catch (error) {
        
    }
}