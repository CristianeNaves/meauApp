export function mockLogin(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'asehuh12u7890h5qu78rhn3',
                user: {
                    name: 'ASDASD',
                    email: 'a@a.com',
                },
            });
        }, 2000);
    });
}