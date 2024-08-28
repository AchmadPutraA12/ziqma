import moment from "moment";

export const formatDate = (date: string) => {
    return moment(date).locale("id").format("DD MMMM YYYY");
};
