export function getCssClss() {
    return `
        .example-enter {
            opacity: 0.01;
            transform: scale(0.01);
        }

        .example-enter.example-enter-active {
            opacity: 1;
            transform: scale(1); 
            transition: all 1000ms ease-in;
        }
        .example-leave {
            opacity: 1;
            transform: scale(1);
        }
        .example-leave.example-leave-active {
            opacity: 0.01;
            transform: scale(0.01);
            transition: all 1000ms ease-in;
        }
        .example-appear {
            opacity: 0.01;
            transform: scale(0.01);
        }
        .example-appear.example-appear-active {
            opacity: 1;
            transform: scale(1);
            transition: all 1000ms ease-in;
        }
    `
}