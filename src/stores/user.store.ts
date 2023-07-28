import { defineStore } from 'pinia'

export const useUser = defineStore('userStore', {
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
        setUser(userData: any) {
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
    }
});