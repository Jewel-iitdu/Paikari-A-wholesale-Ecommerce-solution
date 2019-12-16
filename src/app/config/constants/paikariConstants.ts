export const paikariconst = {
  sidebar: [
    {
      name: "Dashboard",
      url: "home",
      icon: "dashboard"
    }
  ],
  siteName: {
    name: "Paikari"
  },
  defaultPhonenumberCode: "bd",
  emailsent: "Email sent successfully",
  checkEmail: "Verification email sent",
  orderStatus:[
    {value: 'Paid'},

    {value: 'Confirmed'},
    {value: 'Processing'},
    {value: 'Shipped'},
    {value: 'Refund'},
    {value: 'Complete'}

  
  ]
};

export const paikariMenuConst = {
  menubar: [
    {
      name: "Home",
      url: "home"
    },
    
    {
      name: "Category",
      url: "Category"
    }
  ],
  accountbar: [
    {
      name: "My Account",
      url: "/user/my-account"
    },
    {
      name: "My Order",
      url: "order/order-list"
    },
    {
      name: "Transaction History",
      url: "transaction-history"
	},
	{
		name: 'SignOut',
		url: 'sign-out'
	}
  ],

  siteName: {
    name: "Paikari"
  }
  // defaultPhonenumberCode: 'bd',
  // emailsent:'Email sent successfully',
  // checkEmail:'Verification email sent'
};
export const signinErrorCode = {
  "Invalid Email": {
    code: "auth/invalid-email",
    message: "Enter valid email address"
  },
  "User Disabled": {
    code: "auth/user-disabled",
    message: "Account with the corresponding email is disabled"
  },
  "User not found": {
    code: "auth/user-not-found",
    message: "No such user found with the corresponding email"
  },
  "Wrong password": {
    code: "auth/wrong-password",
    message: "Password does not match"
  }
};

export const recoverAccountCode = {
  "Invalid Email": {
    code: "auth/invalid-email",
    message: "Enter valid email address"
  },
  "User not found": {
    code: "auth/user-not-found",
    message: "No such email is registered"
  }
};

export const signupErrorCodes = {
  "Email Already in use": {
    code: "auth/email-already-in-use",
    message: "This email is taken"
  },
  "Invalid Email": {
    code: "auth/invalid-email",
    message: "Enter valid email address"
  },
  "Invalid Operation": {
    code: "auth/operation-not-allowed",
    message: "Site do not have permission"
  },
  "Weak Password": {
    code: "auth/weak-password",
    message: "Password is too weak"
  }
};

// export const passwordRegex='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm';
export const passwordRegex =
  "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

// This can vary if routes are changed in module so maintain consistency
export const urlPaths = {
  Authentication: {
    Signin: {
      url: "authentication/sign-in"
    },
    Signup: {
      url: "authentication/sign-up"
    },
    AccountRecovery: {
      url: "authentication/account-recovery"
    }
  },
  Home: {
    customerhome: {
      url: "home"
    }
  },
  Product: {
    AddProduct: {
      url: "product/add-products"
    },
    ModifyProduct: {
      url: "product/modify-products"
    },
    ProductList: {
      url: "product/product-list"
    }
  },
  UserProfile: {
    MyAccount: {
      url: "user/my-account"
    },
    UpdateProfile: {
      url: "user/update-my-account"
    },
    Transaction:{
      url: "user/transactions"
    }
  },
  Order: {
    MyOrder: {
      url: "order/order-list"
    },
    cart: {
      url: "order/cart"
    }
  },
  
};


