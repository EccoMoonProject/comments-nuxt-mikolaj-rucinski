<template>
    <!--make simple signup page-->
    <CBox d="flex" w="500px" h="500px" flex-dir="column" justify-content="center" align-items="center" border="1px"
        border-color="gray.200" rounded="md" p="4">
        <CHeading text-align="center" mb="4">
            Rejestracja 
        </CHeading>

        <CTextarea v-model="name" placeholder="imię" />
        <CTextarea v-model="email" placeholder="Email" />


        <CButton @click="signup" colorScheme="blue" mt="4">
            Zarejestruj się ⚡️
        </CButton>


    </CBox>
</template>
<script>
import axios from 'axios'
export default {

    name: 'Signup',
    data() {
        return {
            email: '',
            name: '',
        }
    },
    methods: {
        showToast() {
            this.$toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 10000,
                isClosable: true
            })
        },
        async signup() {

            const response = await axios.get(`http://localhost:8080/signup/${this.email}/${this.name}/[]`)
            console.log(response)
            this.showToast()

        }

    }
}
</script>
