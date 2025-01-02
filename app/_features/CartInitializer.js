"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { fetchCart } from "./cartSlice";

const CartInitializer = () => {
  const dispatch = useDispatch();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      const email = user.primaryEmailAddress.emailAddress;
      dispatch(fetchCart(email));
    }
  }, [isSignedIn, user, dispatch]);

  return null;
};

export default CartInitializer;
