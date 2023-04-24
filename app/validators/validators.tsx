

export const createProjectValidators = {
    validateUrl: function validateUrl(url: string) {
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
    },
    validateProjectName: function validateProjectName(projectName: string) {
        if (projectName.length < 3) {
            return "the projectName must be at least 3 characters long";
        }
    },
    validateProjectType: function validateProjectType(projectType: string) {
        if (projectType.length < 2) {
            return "a project name is required, and there isn't a name in business that's only 1 character long";
        }
    },
    validateProjectSynopsis: function validateProjectSynopsis(projectSynopsis: string) {
        if (projectSynopsis.length < 10) {
            return "your synopsis is important, it should be at least 10 characters long";
        }
    },
    validateProjectDescription: function validateProjectDescription(projectDescription: string) {
        if (projectDescription.length < 60) {
            return "your description should be 10 characters long at a minimum, but you can do better than that";
        }
    },
    validateProjectTechStack: function validateProjectTechStack(projectTechStack: string) {
        if (projectTechStack.split(',').length < 1) {
            return "your tech stack is lacking, you need at least 2 to make a stack";
        }
    },
    validateProjectFundingGoal: function validateProjectFundingGoal(projectFundingGoal: number) {
        if(projectFundingGoal < 0) {
            return "the funding goal for any project must be a positive, even if a dollar";
        } 
    },
    validateDate: function validateDate(date: string) {
        const regex = /^([0-9]{1,2})\/?([0-9]{1,2})?\/?([0-9]{0,4})?$/;
        const match = date.replace(/\D/g, '').match(regex);
        if(match === null) {
            return '';
        }
        let formatted = '';
        if(match[1]) {
            formatted += match[1];
            if(match[2]) {
                formatted += '/' + match[2];
                if(match[3]) {
                    formatted += '/' + match[3];
                }
            }
        }
        return formatted;
    } 
}