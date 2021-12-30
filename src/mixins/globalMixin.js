export default {
    methods: {
        short(val) {
            return (val && val.length > 3) || "Muito curto";
        },
        required(val) {
            return (val && val.length > 0) || "Item obrigatorio!";
        },
        isEmail(val) {
            const emailPattern =
                /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(val) || "Email invalido!";
        },

        isNotNull(value) {
            if (!value) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            if (typeof value == "string" && !value.trim()) return false;
            return true
        }
    }
};
