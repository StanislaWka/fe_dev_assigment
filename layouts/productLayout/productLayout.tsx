import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import api from '../../pages/api';
import Image from 'next/image';
import { CustomButton } from '../../components/common';
import { Oval } from 'react-loader-spinner';
import { ButtonMenu } from './buttonsMenu';

interface ProductLayoutProps {}

export function ProductLayout(props: ProductLayoutProps) {
  const [cost, setCost] = React.useState<number | undefined>(0);
  const [reward, setReward] = React.useState(0);

  const [firstOption, setFirstOption] = React.useState('');
  const [secondOption, setSecondOption] = React.useState('');
  const [variant, setVariant] = React.useState<any>();

  const { loading, data } = useQuery(api.GET_PRODUCT('53'));
  const [addToCard, { loading: loadingMutation}] =
    useMutation(api.ADD_TO_CART);

  let productData: any;
  let variantRewards: any;

  if (data?.productById) {
    productData = JSON.parse(data.productById.data);
    variantRewards = JSON.parse(data.productById.variantRewards);
  }

  React.useEffect(() => {
    let cleanUpFunction = false;

    if (!cleanUpFunction && variantRewards && productData) {
      const maxRewards = Math.max(...(Object.values(variantRewards) as number[]));

      const variantId = Object.keys(variantRewards).find(
        (key) => variantRewards[key] === maxRewards,
      );

      const variant = productData.variants.find((variant: any) => variant.id == variantId);

      if (variant) {
        setFirstOption(variant.option1);
        setSecondOption(variant.option2);
        setVariant(variant);
      }
    }

    return () => {
      cleanUpFunction = true;
    };
  }, [data]);

  React.useEffect(() => {
    let cleanUpFunction = false;
    if (!cleanUpFunction && firstOption && secondOption) {
      const variant = productData.variants.find(
        (variant: any) => variant.option1 === firstOption && variant.option2 === secondOption,
      );

      if (!variant) {
        setCost(undefined);
        setReward(0);
      } else {
        setCost(variant.price);
        setVariant(variant);
        const reward = variantRewards[variant.id];

        if (reward) {
          setReward(reward);
        }
      }
    }
    return () => {
      cleanUpFunction = true;
    };
  }, [firstOption, secondOption]);

  const handleSizeOption = (value: string) => {
    setFirstOption(value);
  };

  const handleFlavourOption = (value: string) => {
    setSecondOption(value);
  };

  const handleSubmit = () => {
    addToCard({ variables: { variantId: variant.id.toString() } });
  };

  return (
    <div>
      {loading ? (
        <div className="h-screen relative">
          <div className='absolute top-1/2 left-1/2'>
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={10}
              strokeWidthSecondary={2}
              color="blue"
              secondaryColor="white"
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-beige p-10 rounded-b-3xl mb-4">
            <div className="flex justify-between">
              <p className="text-2xl">Clean Lean Protein</p>
              <div>
                {cost !== undefined ? (
                  <p className="text-2xl text-mainOrange text-right">${cost}</p>
                ) : (
                  <p className="text-2xl text-mainOrange">Variant Unavailable</p>
                )}
                {!!reward && (
                  <p className="text-s">
                    You get: <span className="text-orange">${reward.toFixed(2)}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="px-[calc(20px+(500)*(100vw-480px)/(1440-480))]">
            <div className="mb-4 ">
              <Image className="w-30" src={productData.images[25]} alt="Clean Protein"></Image>
            </div>
            <div></div>
            <h2 className="text-2xl">Clean Lean Protein</h2>
            <p className="text-m text-grayLight mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo accusamus possimus!
              Quia deserunt sed mollitia veniam necessitatibus perspiciatis similique suscipit,
              architecto aut temporibus voluptatum ipsam accusamus amet. Impedit, ipsam?
            </p>
            <ButtonMenu option={productData.options[0]} handleClick={handleSizeOption} selectValue={firstOption}/>
            <ButtonMenu option={productData.options[1]} handleClick={handleFlavourOption} selectValue={secondOption}/>
            <button
              onClick={handleSubmit}
              className={`${
                cost && !loadingMutation ? 'bg-mainOrange' : 'bg-grayLight'
              } p-5 w-full rounded-xl mb-4`}
              type="button"
              disabled={!cost || loadingMutation}>
              <span className="text-white">Add to My Store</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
