<script>
    import { registerUser, loginUser, logoutUser, getUser } from '$lib/index';

    let loggedInUser = null;

    async function login(email, password) {
        loginUser({email: email, password: password});
    }

    async function register(email, password) {
        registerUser({email: email, password: password});
    }

    function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const type = e.submitter.dataset.type;
        
        if (type === "login") {
            login(formData.get('email'), formData.get('password'));
        } else if (type === "register") {
            register(formData.get('email'), formData.get('password'));
        }
    }

    async function logout() {
       const user = await getUser()
       console.log(user);
    }
</script>

<form on:submit={submit}>
    <input type="email" placeholder="Email" name="email" required />
    <input type="password" placeholder="Password" name="password" required />

    <button type="submit" data-type="login">Login</button>
    <button type="submit" data-type="register">Register</button>
</form>

<button on:click={logout}>Logout</button>
