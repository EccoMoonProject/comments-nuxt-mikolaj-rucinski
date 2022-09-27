<template>
    <CBox d="flex" w="500px" h="500px" flex-dir="column" justify-content="center" align-items="center" border="1px"
        border-color="gray.200" rounded="md" p="4">
        <CHeading text-align="center" mb="4">
            Komentarze ⚡️
        </CHeading>
        <CBox d="flex" w="500px" h="400px" flex-dir="column" justify-content="center" align-items="center" border="1px"
            border-color="gray.200" rounded="md" p="4">
            <CBox v-for="comment in comments" :key="comment.id" d="flex" w="500px" h="100px" flex-dir="column"
                justify-content="center" align-items="center" border="1px" border-color="gray.200" rounded="md" p="4">
                <!-- display email -->
                <CBox d="flex" w="500px" h="20px" flex-dir="column" justify-content="center" align-items="center"
                    border="1px" border-color="gray.200" rounded="md" p="4">
                    Title: {{ comment.title }}
                </CBox>

                {{ comment.content }}


                <CBox d="flex" w="500px" h="20px" flex-dir="column" justify-content="center" align-items="flex-end"
                    border="1px" border-color="gray.200" rounded="md" p="4">
                    Created at: {{ comment.createdAt }} by author id: {{ comment.authorId }}
                </CBox>

            </CBox>
        </CBox>

        <CButton @click="showComment = true" colorScheme="blue" mt="4">
            Dodaj komentarz
        </CButton>

        <CModal :isOpen="showComment">
            <CModalOverlay />
            <CModalContent>
                <CModalHeader>Dodaj komentarz</CModalHeader>
                <CModalBody>
                    <CTextarea v-model="email" placeholder="Email" />
                    <CTextarea v-model="title" placeholder="Tytuł" />
                    <CTextarea v-model="comment" placeholder="Wpisz komentarz" />
                </CModalBody>

                <CModalFooter>
                    <CButton colorScheme="blue" mr="3" @click="addComment">
                        Dodaj
                    </CButton>
                    <CButton colorScheme="blue" mr="3" @click="showComment = false">
                        Anuluj
                    </CButton>
                </CModalFooter>
            </CModalContent>
        </CModal>
    </CBox>
</template>

<script>
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
    name: 'Thread',
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
    data() {
        return {
            comments: [],
            showComment: false,
            title: '',
            comment: '',
        }
    },
    methods: {

        async getComments() {
            const response = await axios.get(`http://localhost:8080/post/12`)
            this.comments = response.data
        },
  
        async addComment() {
            this.$toast({
                title: 'Comment sent.',
                description: "We've sent your comment.",
                status: 'success',
                duration: 10000,
                isClosable: true
            })

            const response = await axios.post('http://localhost:8080/post', {
                title: this.title,
                content: this.comment,
                authorEmail: this.email
            })
           
            const createdAt = response.data.createdAt.split('T')
            const updatedAt = response.data.updatedAt.split('T')
            
            response.data.createdAt = createdAt[0] + ' ' + createdAt[1].split('.')[0]
            response.data.updatedAt = updatedAt[0] + ' ' + updatedAt[1].split('.')[0]
            // add comment to the comments array
            this.comments.push(response.data)
            console.log(this.comments)
        },

        async deleteComment(id) {
            await axios.delete(`http://localhost:8080/post/${id}`)
            this.comments = this.comments.filter((comment) => comment.id !== id)
        },
    },
    // mounted() {
    //     this.getComments()
    // },

}


</script>
