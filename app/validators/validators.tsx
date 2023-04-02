

export const validateUrl = {
    validateFn: function validateUrl(url: string) {
        let urls = [
            "/",
            "/dashboard",
            "/project",
            "https://remix.run"
        ];
        if (urls.includes(url)) {
            return url;
        }
        return "/dashboard";
    }
}


export const createProjectValidators = {
    validateProjectName: function validateProjectName(projectName: string) {
        if (typeof projectName !== "string" || projectName.length < 3) {
            return "The projectName must be at least 3 characters long";
        }
    },
    validateProjectType: function validateProjectType(projectType: string) {
        if (typeof projectType !== "string" || projectType.length < 4) {
            return "The password must be at least 6 characters long";
        }
    },
    validateProjectSynopsis: function validateProjectSynopsis(projectSynopsis: string) {
        if (typeof projectSynopsis !== "string" || projectSynopsis.length < 10) {
            return "The password must be at least 6 characters long";
        }
    },
    validateProjectDescription: function validateProjectDescription(projectDescription: string) {
        if (typeof projectDescription !== "string" || projectDescription.length < 60) {
            return "The password must be at least 6 characters long";
        }
    },
    validateProjectTechStack: function validateProjectTechStack(projectTechStack: string) {
        if (typeof projectTechStack !== "string" || projectTechStack.length < 6) {
            return "The password must be at least 6 characters long";
        }
    },
    validateProjectBeginDate: function validateProjectBeginDate(projectBeginDate: string) {
        if (typeof projectBeginDate !== "string" || projectBeginDate.length < 6) {
            return "The password must be at least 6 characters long";
        }
    },
    validateProjectEndDate: function validateProjectEndDate(projectEndDate: string) {
        if (typeof projectEndDate !== "string" || projectEndDate.length < 6) {
            return "The password must be at least 6 characters long";
        }
    },
    validateProjectFundingGoal: function validateProjectFundingGoal(projectFundingGoal: number) {
        if(typeof projectFundingGoal !== "number" || projectFundingGoal < 0) {
            return "The funding goal must be a positive";
        }
    }
}