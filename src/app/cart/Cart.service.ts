
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CartService {
    Cartdata: any[] = [];
    productlist = new BehaviorSubject<any>([]);
    constructor( private http:HttpClient) { }
    // get product data
    getproductdata(){
        return this.productlist.asObservable();
    }
    // set product data
    setproductdata( product:any){
    this.Cartdata.push(...product);
    this.productlist.next(product);
    }
    
    // add to cart detail
    Addtocart(product: any) {
        this.Cartdata.push(product);
        this.productlist.next(this.Cartdata);
        this.getTotalPrice();
        console.log("Cartdata:", this.Cartdata);
    }    
    getTotalPrice(): number {
        let grandTotal = 0;
        this.Cartdata.forEach((item: any) => {
            // console.log("Item:", item);
            const price = parseFloat(item.price.replace('.', '').replace(',', '.'));
            if (!isNaN(price) && item.quantity_oder) {
                grandTotal += price * item.quantity_oder;
            }
        });
        // console.log("Tổng giá trị:", grandTotal);
        return grandTotal;
    } 
    // remove product to cart
    RemoveCart(product:any){
    this.Cartdata.map((a:any, index:any)=>{
        if(product.id === a.id){
        this.Cartdata.splice(index,1)
        }
    })
    this.productlist.next(this.Cartdata)
    }
    // remove all data to cart
    Removealldata(){
        this.Cartdata = []
        this.productlist.next(this.Cartdata)
    }
}
