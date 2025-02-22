import type { DeliveryInfoType } from "@/Types";

export function getDeliveryInfoFromLocalStorage():DeliveryInfoType | null{
    const localStorageDeliveryInfo = localStorage.getItem("delivery-info")
    if(localStorageDeliveryInfo){
        return JSON.parse(localStorageDeliveryInfo)
    }
    return ({
        name:null,
        phone:null,
        address:null,
        email:null
    })
}

export function saveDeliveryInfoInLocalStorage(deliveryInfo: DeliveryInfoType){
    localStorage.setItem("delivery-info", JSON.stringify(deliveryInfo))
}