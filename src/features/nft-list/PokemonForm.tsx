import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { BasicInputControl, NFT } from "@/features/common";

type NFTBasicData = {
  name: string;
  type: string;
  hp: number;
  weight: number;
};

const PokemonSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  hp: yup.number().required(),
  weight: yup.number().required(),
});

export default function PokemonForm({
  onSubmit,
  ...otherProps
}: {
  onSubmit: (pokemon: NFT) => void;
} & Omit<React.ComponentProps<"form">, "onSubmit">) {
  const form = useForm<NFTBasicData>({
    defaultValues: {
      name: "",
      type: "",
      hp: 0,
      weight: 0,
    },
    resolver: yupResolver(PokemonSchema),
  });

  const { register, handleSubmit } = form;

  const onSubmitHandler = (data: NFTBasicData) => {
    const pokemon = {
      id: data.name.toLowerCase(),
      name: data.name,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10103.png",
      },
      types: [{ slot: 1, type: { name: data.type } }],
      stats: [{ stat: { name: "hp" }, base_stat: data.hp }],
      weight: data.weight,
    };
    onSubmit(pokemon as unknown as NFT);
  };
  console.log(form.formState.errors);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmitHandler)} {...otherProps} noValidate>
        <BasicInputControl label="Name" type="text" {...register("name")} />
        <BasicInputControl label="Type" type="text" {...register("type")} />
        <BasicInputControl label="HP" type="number" {...register("hp")} />
        <BasicInputControl
          label="Weight"
          type="number"
          {...register("weight")}
        />
      </form>
    </FormProvider>
  );
}
