<template>
    <CBox v-bind="mainStyles[colorMode]" d="flex" w="100vw" h="100vh" flex-dir="column" justify-content="center">
        <CHeading text-align="center" mb="4">
            ⚡️ Place your comment
        </CHeading>
        <CFlex justify="center" direction="column" align="center">
            <CTextarea v-model="email" placeholder="Your email address" size="lg" w="500px" h="40px" mb="4" />
            <CTextarea v-model="title" placeholder="Title" size="lg" w="500px" h="40px" mb="4" />
            <CTextarea v-model="comment" placeholder="Your comment" size="lg" w="500px" h="200px" mb="4" />
            <CButton colorScheme="blue" size="lg" w="500px" h="50px" mb="4" @click="sendComment">
                Send
            </CButton>

            <CButton colorScheme="blue" size="lg" w="500px" h="50px" mb="4" @click="getComments">
                Get comments
            </CButton>

            <!-- show this comment after sending-->
            <CBox v-if="showComment" d="flex" w="500px" h="200px" flex-dir="column" justify-content="center"
                align-items="center" border="1px" border-color="gray.200" rounded="md" p="4">
                <CHeading text-align="center" mb="4">
                    {{ title }}
                </CHeading>
                <!--make a div with comment as a text-->
                <CBox d="flex" w="500px" h="100px" flex-dir="column" justify-content="center" align-items="center"
                    border="1px" border-color="gray.200" rounded="md" p="4">
                    {{ comment }}
                </CBox>

            </CBox>



        </CFlex>
    </CBox>
</template>

<script lang="js">
import axios from 'axios'
import {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CTextarea,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading,
} from '@chakra-ui/vue'

export default {
    name: 'CommentSection',
    components: {
        CBox,
        CButton,
        CAvatarGroup,
        CAvatar,
        CTextarea,
        CAvatarBadge,
        CModal,
        CModalContent,
        CModalOverlay,
        CModalHeader,
        CModalFooter,
        CModalBody,
        CModalCloseButton,
        CIconButton,
        CFlex,
        CHeading,
    },
    inject: ['$chakraColorMode', '$toggleColorMode'],
    // make comment visible after sending
    data() {
        return {
            email: '',
            title: '',
            comment: '',
            showComment: false,
        }
    },
    computed: {
        colorMode() {
            return this.$chakraColorMode()
        },
        mainStyles() {
            return {
                light: {
                    bg: 'gray.50',
                },
                dark: {
                    bg: 'gray.800',
                },
            }
        },
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
        sendComment() {
            this.$toast({
                title: 'Comment sent.',
                description: "We've sent your comment.",
                status: 'success',
                duration: 10000,
                isClosable: true
            })

            axios.post('http://localhost:8080/post', {
                title: this.title,
                content: this.comment,
                authorEmail: this.email
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })


        },

        // show comment after sendComment
        getComments() {
            axios.get('http://localhost:8080/post/13')
                .then(response => {
                    this.comments = response.data
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
            this.showComment = true

        },


        showComment() {
            this.showComment = true
        }




    }
}
</script>