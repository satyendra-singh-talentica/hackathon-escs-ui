import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            id: 0,
            employeeId: 0,
            name: "",
            email: "",
            phone: "",
            gender: null,
            designation: "",
            github: null,
            dateOfJoining: "",
            dateOfBirth: ""
        }
    },
    actions: {
        setUser(userData) {
            this.id = userData.id;
            this.employeeId = userData.employeeId;
            this.name = userData.name;
            this.email = userData.email;
            this.phone = userData.phone;
            this.gender = userData.gender;
            this.designation = userData.designation;
            this.github = userData.github;
            this.dateOfJoining = userData.dateOfJoining;
            this.dateOfBirth = userData.dateOfBirth;
        },
    },
    getters: {
        getUserName() {
            return this.name;
        },
        getUserId() {
            return this.id;
        },
    },
});